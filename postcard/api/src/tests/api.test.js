import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createMemoryStore } from '../store.js';

describe("in memory store", () => {
    it("starts empty", async () => {
        const store = createMemoryStore({ seed: false });

        //assert what should be true
        expect(await store.ready()).toBe(true);
        expect(await store.all()).toEqual([]);
    })

    it("starts with records in a seeded store", async () => {
        const store = createMemoryStore({ seed: true });

        //assert what should be true
        expect(await store.ready()).toBe(true);
        expect(await store.all()).not.toHaveLength(0);
    })

    it("returns records with the right format", async () => {
        const store = createMemoryStore({ seed: true });

        const allPC = await store.all();
        const firstPC = allPC[0];
        expect(firstPC).toHaveProperty("place");
        expect(firstPC).toHaveProperty("message");  
    })
})