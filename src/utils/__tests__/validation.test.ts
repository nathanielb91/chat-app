function isValidUsername(username: string) {
  return /^[a-zA-Z0-9_]{1,15}$/.test(username.trim());
}

describe("Username validation", () => {
  it("accepts valid usernames", () => {
    expect(isValidUsername("User123")).toBe(true);
    expect(isValidUsername("user_1")).toBe(true);
  });

  it("rejects invalid usernames", () => {
    expect(isValidUsername("")).toBe(false);
    expect(isValidUsername("   ")).toBe(false);
    expect(isValidUsername("!user$")).toBe(false);
    expect(isValidUsername("user with spaces")).toBe(false);
    expect(isValidUsername("toolongusername123456789")).toBe(false);
  });
});
