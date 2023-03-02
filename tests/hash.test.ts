test('makeHash creates valid bcrypt hash (60 characters).', () => {
    const text = 'Example password';
    const newHash = makeHash(text);

    expect(newHash.length).toBe(60);
});
