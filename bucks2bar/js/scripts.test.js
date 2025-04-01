const { test, expect } = require('@jest/globals');

const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

// Valid username tests
test('Valid username with at least 1 capital letter, 1 special character, 1 number, and at least 8 characters', () => {
    expect(regex.test('Password1!')).toBe(true);
});

test('Valid username with multiple special characters and numbers', () => {
    expect(regex.test('Test@1234')).toBe(true);
});

test('Valid username with a mix of letters, numbers, and special characters', () => {
    expect(regex.test('Valid#2023')).toBe(true);
});

// Invalid username tests
test('Invalid username without a capital letter, special character, or number', () => {
    expect(regex.test('password')).toBe(false);
});

test('Invalid username without a special character or number', () => {
    expect(regex.test('Password')).toBe(false);
});

test('Invalid username without a number', () => {
    expect(regex.test('Password!')).toBe(false);
});

test('Invalid username with less than 8 characters', () => {
    expect(regex.test('Pass1!')).toBe(false);
});