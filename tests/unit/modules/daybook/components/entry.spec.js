import { shallowMount } from "@vue/test-utils";
import { journalState } from "../../..//mock-data/test-journal-state";

import Entry from "@/modules/daybook/components/Entry";

describe("Pruebas en el entry component", () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const wrapper = shallowMount(Entry, {
    props: {
      entry: journalState.entries[0],
    },
    global: {
        mocks:{
            $router: mockRouter,
        }

    },
  });

  test("Debe hacer match con el snapshot", () => {
    
    expect(wrapper.html()).toMatchSnapshot();
  
  });

  test("Debe redireccionar al hacer click en el entry-container", () => {});

  const entryContainer = wrapper.find('.entry-container')
  entryContainer.trigger('click')

  expect( mockRouter.push ).toHaveBeenCalledWith({
      name: 'entry',
      params: {
          id: journalState.entries[0].id
      }
  })

  test("Pruebas en las propiedades computadas", () => {
    
    expect( wrapper.vm.day ).toBe(26)
    expect( wrapper.vm.month ).toBe('Mayo')
    expect( wrapper.vm.yearDay ).toBe(' 2022, Jueves ')
  });
});
