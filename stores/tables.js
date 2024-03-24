export const useTargetStore = defineStore("targets", {
  state: () => ({
    data: null,
    subs: null,
    error: null,
    domain: "",
  }),
  getters: {
    targets: (state) => state.data?.targets || [],
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
        this.data = data;
      } catch (error) {
        this.error = error;
      }
    },
    async addTargets(tgt) {
      console.log(tgt);
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

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.data.addTarget.status === "Target added successfully")
          this.data.targets.push({
            __typename: "Target",
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

        if (
          responseData.data.removeTarget.status ===
          "Target removed successfully"
        ) {
          const indexToRemove = this.data.targets.findIndex(
            (target) => target.target === tgt
          );
          if (indexToRemove !== -1) {
            this.data.targets.splice(indexToRemove, 1);
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
        const { data } = await useAsyncQuery(query, variables);
        this.setSub(data);
        console.log(this.subs);
      } catch (error) {
        this.error = error;
      }
    },
    async setSub(sub) {
      this.$patch({
        subs: sub,
      });
    },
    async setDomain(domain) {
      this.domain = domain;
      await this.fetchSubs();
    },
    async runScan() {
      try {
        const query = gql`
          query RunScan($target: String!) {
            runScan(target: $target) {
              target
              status
            }
          }
        `;
        const variables = { target: this.domain };
        const { data } = await useAsyncQuery(query, variables);
        this.setSub(data);
        console.log(this.subs);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
