import React from 'react';
import Renderer from 'react-test-renderer';
import PinnedUser from '../PinnedUser';
import { user } from '../../../../../../__tests__/mock/data';

const props = {
  pinnedUsers: [user],
  removeUser: jest.fn()
};
const wrapper = Renderer.create(<PinnedUser {...props} />);

describe('Pinned User ', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
