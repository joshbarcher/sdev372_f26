import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import { createMemoryStore } from '../store.js';
import { createApp } from '../app.js';

let store, app;

beforeEach(() => {
    store = createMemoryStore({ seed: false });
    app = createApp({ store });
})

describe("server available", () => {
    it("ready responds", async () => {
        const res = await request(app).get("/ready");
        expect(res.status).toBe(200);
        expect(res.body.ready).toBe(true);
    })

    it("health reports healthy", async () => {
        const res = await request(app).get("/health");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "ok" })
    })
})

describe("postcard api", () => {
    it("accepts new postcards", async () => {
        const newPostcard = { place: "Puyallup", message: "Avoid Meridian" }
        const res = await request(app)
            .post("/api/postcards")
            .send(newPostcard);
        
        expect(res.status).toBe(201);
        expect(res.body).not.toBeUndefined();

        const addedPC = res.body;
        expect(addedPC).toHaveProperty("id");
        expect(addedPC).toHaveProperty("sentAt");
        expect(addedPC.place).toBe("Puyallup");
    })
})