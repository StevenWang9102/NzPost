import { doNotDeleteIDs } from '../constant/defaultIds';

test('Default Pokerman ids = 3', () => {
  expect(doNotDeleteIDs.length).toBe(3);
});
