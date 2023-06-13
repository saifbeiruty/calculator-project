import supertest from 'supertest';
import request from "supertest"
import app from './server/app';


// Needed to also add test for GET request but I have tested that with Postman

describe("POST /api/calculate", () => {

    describe("Given a correct expression", () => {
        // Must return a status code of 200
        test("should return a status code 200", async () => {
            const response = await request(app).post("/api/calculate").send({
                expression: "2*x+5*y",
                variables: {
                    x: 2,
                    y: 4
                }
            })
            expect(response.statusCode).toBe(200)
        })
        // Must return back the result (JSON)
        test("should return a json in the headers", async () => {
            const response = await request(app).post("/api/calculate").send({
                expression: "2*x+5*y",
                variables: {
                    x: 5,
                    y: 10
                }
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        //Must return correct result 
        test("should return the correct result", async () => {
            const response = await request(app).post("/api/calculate").send({
                expression: "2*x+5*y",
                variables: {
                    x: 5,
                    y: 10
                }
            })
            expect(response.text).toBe("60")
        })
    })



    describe("Given an incorrect/missing expression", () => {
        // Must return a status code of 400 since the variables object is missing
        test("should return a status code 400", async () => {
            const response = await request(app).post("/api/calculate").send({
                expression: "2*x+5*y"
            })
            expect(response.statusCode).toBe(400)
        })
        // Must return a status code of 400 since the variables object does not have all the variables
        test("should return a status code 400(Missing a variable)", async () => {
            const response = await request(app).post("/api/calculate").send({
                expression: "2*x+5*y",
                variables: {
                    x: 5,
                }
            })
            expect(response.statusCode).toBe(400)
        })
        test("should return a status code 400(Missing a variable)", async () => {
            const response = await request(app).post("/api/calculate").send({
                expression: 2
            })
            expect(response.statusCode).toBe(400)
        })
        // Must return an error if expression is not a string 
        test("should return an Error", async () => {
            const response = await request(app).post("/api/calculate").send({
                expression: 2
            })
            expect(response.text).toBe("{\"log\":\"Express error handler caught unknown middleware error\",\"status\":400,\"message\":{\"err\":\"The Expression is not a string\"}}")
        })
        
    })


})

