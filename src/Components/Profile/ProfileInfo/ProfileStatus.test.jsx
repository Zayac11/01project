import React from 'react';
import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status = "avatar"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("avatar");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status = "avatar"/>);

        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <nput> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status = "avatar"/>);

        const root = component.root;
        expect( () => {
            let input = root.findByType("input");
        }).toThrow(); //Тест на ошибку
    });

    test("after creation <span> with status should contains with correct status", () => {
        const component = create(<ProfileStatus status = "avatar"/>);

        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe('avatar');
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status = "avatar"/>);

        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe('avatar');
    });


    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status = "avatar" updateStatus = { mockCallback } />);

        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1); //Считает сколько раз функцию вызывают
    });

});