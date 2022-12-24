var request = require('supertest')
var app = require("../index")

describe('testing index file', () => {
  test('get mavrckco should return 200', async () => {
    const res = await request(app).get("/getUserInfo?handle=mavrckco");
    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe('Mavrck');
    // The test can fail because of rate limit exceed when call to instagram
    //expect(res.body.error).toBe('error fetching user info');
  });
});