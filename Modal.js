import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'wicg-inert';

import Portal from './Portal';
import H from './Heading';

import useBodyScrollLock from './hooks/useBodyScrollLock';

const KEY_ESCAPE = 27;

const Content = styled.div`
  max-height: 50vh;
  max-width: 50ch;
  overflow-y: auto;
`;

const Modal = ({ id, show, actions, onClose, ...props }) => {
  const previousFocus = useRef(null);
  const dialogRef = useRef(null);
  const autoFocusActionRef = useRef(null);
  const contentRef = useBodyScrollLock(show);

  const rootNodes = document.querySelectorAll("body > *");

  const close = useCallback(() => {
    // remove inert attributes
    rootNodes.forEach(child => child.removeAttribute('inert'));

    // return focus to where it was before the modal was opened
    if (previousFocus.current) {
      setTimeout(() => {
        previousFocus.current.focus();
      }, 0);
    }

    // call close callback
    onClose();
  }, [rootNodes, previousFocus, onClose]);

  useEffect(() => {
    if (show) {
      // store current focus so we can return to it when the modal is closed
      previousFocus.current = document.activeElement;

      // apply inert to all other sibling body children
      rootNodes.forEach(child => {
        if (child => child !== dialogRef.current) {
          child.setAttribute('inert', 'inert');
        }
      });

      if (autoFocusActionRef.current) {
        autoFocusActionRef.current.focus();
      }
    } else {
      close();
    }
  }, [rootNodes, show, close]);

  const closeOnEscapeKey = e => {
    if (e.keyCode === KEY_ESCAPE) {
      e.preventDefault();
      close();
    }
  };

  return (
    <Portal>
      {show && (
        <div
          role="dialog"
          ref={dialogRef}
          aria-labelledby={id}
          onKeyDown={closeOnEscapeKey}
          className={props.className}
        >
          <H id={id}>{props.title}</H>

          <Content ref={contentRef}>
            {props.children}
          </Content>

          <div>
            {actions.map(({ fragment, autoFocus }, index) => {
              if (autoFocus) {
                // extend button to allow it be programmatically focused
                return React.cloneElement(fragment, {
                  key: index,
                  ref: autoFocusActionRef,
                  onClick: e => {
                    if (fragment.props.onClick) {
                      fragment.props.onClick();
                    }

                    close();
                  }
                });
              }

              return <React.Fragment key={index}>{fragment}</React.Fragment>;
            })}
          </div>
        </div>
      )}
    </Portal>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      fragment: PropTypes.element.isRequired,
      autoFocus: PropTypes.bool
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};

export default styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
