import React from 'react';
import styled from 'styled-components';
import { Button } from '../ui';
import { signOut } from './signOut';

export const StyledButton = styled(Button)`
    background-color: #ed0d25;
`;

/*
    This button allows users to sign out once they've
    been signed in with Firebase Auth
*/
export const SignOutButton = () => {
    const onClickSignOut = async () => {
        try {
            await signOut();
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <StyledButton
            onClick={onClickSignOut}
            style={{ float: 'right' }}
        >Sign Out</StyledButton>
    );
}