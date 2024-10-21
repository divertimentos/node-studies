import * as user from "../user";

describe("user handler", () => {
  // Sample test
  it("should create a new user", async () => {
    const mockedReq = { body: { username: "testUser", password: "testUser" } };
    const mockedRes = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };

    await user.createNewUser(mockedReq, mockedRes, () => {});
  });
});
