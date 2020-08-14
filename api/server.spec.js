const request = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

describe("server.js", () => {
    test('that the testing environment is set up', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe("POST /teams", () => {
        let res = {};

        beforeEach(async () => {
            await db("teams").truncate();
        });

        test("should return 201 status", async () => {
            const team = { city: "NY", name: "knicks" };
            res = await request(server).post("/teams").send(team);
            expect(res.status).toBe(201);
        });

        test("should return team we sent", async () => {
            const team = { city: "NY", name: "knicks" };
            res = await request(server).post("/teams").send(team);
            expect(res.body.name).toBe("knicks");
        });
    });

    describe("GET /teams", () => {
        let res = {};

        beforeEach(async () => {
            await db("teams").truncate();
        });

        test("should return a 200 status", async () => {
            let team = {};
            team = { city: "LA", name: "Lakers" };
            await request(server).post("/teams").send(team);
            team = { city: "NY", name: "Knicks" };
            await request(server).post("/teams").send(team);

            res = await request(server).get("/teams");
            expect(res.status).toBe(200);

        });

        test("should return all teams", async () => {
            let team = {};
            team = { city: "LA", name: "Lakers" };
            await request(server).post("/teams").send(team);
            team = { city: "NY", name: "Knicks" };
            await request(server).post("/teams").send(team);

            res = await request(server).get("/teams");
            expect(res.body.length).toBe(2);

        });
    });

    describe("DELETE /teams/id", () => {
        let res = {};

        beforeEach(async () => {
            await db("teams").truncate();
        });


        test("should return a 200 status", async () => {
            let team = {};
            team = { city: "LA", name: "Lakers" };
            const team1 = await request(server).post("/teams").send(team);
            team = { city: "NY", name: "Knicks" };
            const team2 = await request(server).post("/teams").send(team);

            res = await request(server).delete(`/teams/${team2.id}`);
            expect(res.status).toBe(200);

        });

        test("should return a the number of teams deleted", async () => {
            let team = {};
            team = { city: "LA", name: "Lakers" };
            const team1 = await request(server).post("/teams").send(team);
            team = { city: "NY", name: "Knicks" };
            const team2 = await request(server).post("/teams").send(team);

            res = await request(server).delete(`/teams/${team2.body.id}`);
            expect(res.body).toBe(1);

        });
    })
});