import '@testing-library/jest-dom'
import iftest from './iftest'
test('1==2 equals false', () => {
    expect(iftest()).toBe(false)
})