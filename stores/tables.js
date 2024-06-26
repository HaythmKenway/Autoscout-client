export const useTargetStore = defineStore("targets", {
  state: () => ({
    data: null,
    subs: null,
    error: null,
    inf: null,
    subdomain: "No subdomain selected",
    domain: "",
  }),
  getters: {
    targets: (state) => state.data?.targets || [],
    info: (state) => state.info?.info || [],
    subdomains: (state) => (state.subs ? state.subs.subDomain || [] : []),
  },
  actions: {
    async fetchTargets() {
      try {
        const query = gql`
          {
            targets {
              target
              status
            }
          }
        `;
        const variables = { limit: 5 };
        const { data } = await useAsyncQuery(query, variables);
        this.$patch({ data }); 
      } catch (error) {
        this.error = error;
      }
    },
    async addTargets(tgt) {
      if(tgt=="")return; 
      const mutationQuery = `
      mutation AddTarget($target: String!) {
        addTarget(input: { 
          target: $target 
        }) {
          target
          status
          lastModified
        }
      }
    `;
    const requestBody = {
      query: mutationQuery,
      variables: { target: targetUrl.value },
    };
      try {
        const response = await fetch("http://localhost:8000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
         
        var responseData=await response.json()
        console.log(responseData.data.addTarget.status=="Target added successfully")
        this.data.targets.push({
          target: tgt,
        });
      } catch (error) {
        console.error("Mutation error:", error);
      }
    },
    async removeTarget(tgt) {
      const mutationQuery = `
      mutation removeTarget($target: String!) {
          removeTarget(input: { 
              target: $target 
          }) {
              target
              status
              lastModified
          }
      }
  `;

const requestBody = {
query: mutationQuery,
variables: { target: tgt },
};
      try {
        const response = await fetch("http://localhost:8000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();
        const indexToRemove = this.data.targets.findIndex((target) => target.target === tgt);
        if (indexToRemove !== -1) {
        if(responseData.data.removeTarget.status=="Target removed successfully")
        {this.data.targets.splice(indexToRemove, 1);
         if(tgt==this.domain)this.subs=[]
            }
        }
      } catch (error) {
        console.error("Mutation error:", error);
      }
    },
    async fetchSubs() {
      try {
        const query = gql`
          query SubDomain($target: String!) {
            subDomain(target: $target) {
              target
              status
            }
          }
        `;
        const variables = { target: this.domain };
        const {loading,error,result}= useQuery(query,variables)
        console.log(result)
        this.$patch({ subs: result }); 
      } catch (error) {
        this.error = error;
      }
    },
    async setSub(sub) {
      this.$patch({ subs: sub }); 
    },
    async setDomain(domain) {
      this.domain = domain;
      await this.fetchSubs();
    },
    async runScan(target) {
      try {
        console.log(target,"working")
        const query = gql`
          query RunScan($target: String!) {
            runScan(target: $target) {
              target
              status
            }
          }
        `;
        const variables = { target: target };
        const data = await useAsyncQuery(query, variables);
        console.log(data)
        this.setSub(result);
      } catch (error) {
        this.error = error;
      }
    },
    async setSubdomain(subdomain){
      this.subdomain=subdomain
    },
    async getData(target){
        try {
            const query = gql`
            query GetData($target: String!){
                getData(target: $target) {
                  url
                  title
                  host
                  status_code
                  scheme
                  a
                  cname
                  tech
                  ip
                  port
                }
            }`
            const variables = { target: target };
            const { result } = await useQuery(query, variables);
            const {getData}=result
            console.log(getData)
            this.inf=result
            
        } catch (error) {
          this.error = error;
        }
    }
  },
});
