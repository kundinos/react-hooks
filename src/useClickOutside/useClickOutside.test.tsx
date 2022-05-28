import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useClickOutside } from './useClickOutside';

describe('Base behavior', () => {
  test('Should be defined', () => {
    expect(useClickOutside).toBeDefined();
  });

  test('Must return the empty ref when no applied to element', () => {
    const { result } = renderHook(() => useClickOutside({ handleEvent: jest.fn }));

    expect(typeof result.current).toEqual('object');
    expect(result.current.current).toBeNull();
  });

  test('Must return the correct ref when applied to HTML element (div)', () => {
    let ref = null;
    const Component = () => {
      ref = useClickOutside({ handleEvent: jest.fn });

      return <div ref={ref} />;
    };

    render(<Component />);
    expect(typeof ref.current).toEqual('object');
    expect(ref.current.toString()).toEqual('[object HTMLDivElement]');
  });

  test('Must return the correct ref when applied to HTML element (input)', () => {
    let ref = null;
    const Component = () => {
      ref = useClickOutside({ handleEvent: jest.fn });

      return <input ref={ref} />;
    };

    render(<Component />);
    expect(typeof ref.current).toEqual('object');
    expect(ref.current.toString()).toEqual('[object HTMLInputElement]');
  });

  test('No error if no specified params', () => {
    const { result } = renderHook(() => useClickOutside());

    expect(result.error).toBeUndefined();
  });
});

describe('When click inside element', () => {
  test('Must no call handleEvent', () => {
    const handleEvent = jest.fn();
    const handleClickPopup = jest.fn();
    const Component = () => {
      const ref = useClickOutside<HTMLDivElement>({ handleEvent });

      return (
        <div className='parent'>
          <div className='popup' ref={ref} onClick={handleClickPopup} />
        </div>
      );
    };

    const { container } = render(<Component />);
    const popup = container.getElementsByClassName('popup')[0];

    fireEvent.click(popup);

    expect(handleClickPopup).toBeCalledTimes(1);
    expect(handleEvent).toBeCalledTimes(0);
  });

  test('Must no call handleEvent if ref not applied', () => {
    const handleEvent = jest.fn();
    const handleClickPopup = jest.fn();
    const Component = () => {
      useClickOutside({ disabled: true, handleEvent });

      return (
        <div className='parent'>
          <div className='popup' onClick={handleClickPopup} />
        </div>
      );
    };

    const { container } = render(<Component />);
    const popup = container.getElementsByClassName('popup')[0];

    fireEvent.click(popup);

    expect(handleClickPopup).toBeCalledTimes(1);
    expect(handleEvent).toBeCalledTimes(0);
  });
});

describe('When click outside element', () => {
  test('Must call handleEvent', () => {
    const handleEvent = jest.fn();
    const handleClickParent = jest.fn();
    const Component = () => {
      const ref = useClickOutside<HTMLDivElement>({ handleEvent });

      return (
        <div className='parent' onClick={handleClickParent}>
          <div className='popup' ref={ref} />
        </div>
      );
    };

    const { container } = render(<Component />);
    const parent = container.getElementsByClassName('parent')[0];

    fireEvent.click(parent);

    expect(handleClickParent).toBeCalledTimes(1);
    expect(handleEvent).toBeCalledTimes(1);
  });

  test('No error if not specified handleEvent, but event triggered', () => {
    const handleClickParent = jest.fn();
    const Component = () => {
      const ref = useClickOutside<HTMLDivElement>();

      return (
        <div className='parent' onClick={handleClickParent}>
          <div className='popup' ref={ref} />
        </div>
      );
    };

    const { container } = render(<Component />);
    const parent = container.getElementsByClassName('parent')[0];

    fireEvent.click(parent);

    expect(handleClickParent).toBeCalledTimes(1);
  });

  test('Must no call handleEvent if disabled', () => {
    const handleEvent = jest.fn();
    const handleClickParent = jest.fn();
    const Component = () => {
      const ref = useClickOutside<HTMLDivElement>({ disabled: true, handleEvent });

      return (
        <div className='parent' onClick={handleClickParent}>
          <div className='popup' ref={ref} />
        </div>
      );
    };

    const { container } = render(<Component />);
    const parent = container.getElementsByClassName('parent')[0];

    fireEvent.click(parent);

    expect(handleClickParent).toBeCalledTimes(1);
    expect(handleEvent).toBeCalledTimes(0);
  });

  test('Must no call handleEvent if ref not applied', () => {
    const handleEvent = jest.fn();
    const handleClickParent = jest.fn();
    const Component = () => {
      useClickOutside({ disabled: true, handleEvent });

      return (
        <div className='parent' onClick={handleClickParent}>
          <div className='popup' />
        </div>
      );
    };

    const { container } = render(<Component />);
    const parent = container.getElementsByClassName('parent')[0];

    fireEvent.click(parent);

    expect(handleClickParent).toBeCalledTimes(1);
    expect(handleEvent).toBeCalledTimes(0);
  });
});

describe('Cleanup', () => {
  test('No call handleEvent after unmount', () => {
    const handleEvent = jest.fn();
    const handleClickParent = jest.fn();
    const Component = () => {
      const ref = useClickOutside<HTMLDivElement>({ handleEvent });

      return (
        <div className='parent' onClick={handleClickParent}>
          <div className='popup' ref={ref} />
        </div>
      );
    };

    const { container, unmount } = render(<Component />);
    const parent = container.getElementsByClassName('parent')[0];

    unmount();
    fireEvent.click(parent);

    expect(handleClickParent).toBeCalledTimes(0);
    expect(handleEvent).toBeCalledTimes(0);
  });
});
