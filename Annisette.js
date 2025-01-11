class AnnisetteProvider {
    constructor(server) {
        this.SessionID = undefined;
        this.server = server;
    }

    async Init() {
        try {
            const response = await fetch(`${this.server}/CreateSession`);
            if (!response.ok) {
                throw new Error(`Failed to create session: ${response.statusText}`);
            }
            const responseBody = await response.json();
            if (!responseBody.SessionID) {
                throw new Error('SessionID not returned from server');
            }
            this.SessionID = responseBody["SessionID"];
        } catch (error) {
            throw error; // Rethrow the error directly without logging
        }
    }

    async getAnisette() {
        try {
            if (this.SessionID == undefined) {
                await this.Init();
            }

            const response = await fetch(`${this.server}/Session/${this.SessionID}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch anisette: ${response.statusText}`);
            }
            const data = await response.json();

            return data;
        } catch (error) {
            throw error; 
        }
    }

    async Destroy() {
        try {
            const response = await fetch(`${this.server}/DestroySession/${this.SessionID}`);
            if (!response.ok) {
                throw new Error(`Failed to destroy session: ${response.statusText}`);
            }
            const responseBody = await response.json();
            if (responseBody.status !== "success") {
                throw new Error(`Failed to destroy session: ${responseBody.message}`);
            }
        } catch (error) {
            throw error; 
        }
    }
}

module.exports = AnnisetteProvider;
