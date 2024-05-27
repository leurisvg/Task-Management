import { generateId } from './utils';

describe('generateId', () => {
  it('should generate a string of length 6', () => {
    const id = generateId();
    expect(id).toHaveLength(6);
  });
});
