import React from "react";
import { ProfilePic } from "./profile-pic";
import { render, fireEvent } from "@testing-library/react";

// TEST 1:
test("renders img with src set to url prop", () => {
    const { container } = render(<ProfilePic url="/dog.png" />);

    expect(
        container.querySelector("img").getAttribute("src") //container is our document from week 2
    ).toBe("/dog.png");
});

// TEST 2:
test("renders img with src set to /default.jpg when no url prop is passed", () => {
    const { container } = render(<ProfilePic />);

    expect(container.querySelector("img").getAttribute("src")).toBe(
        "/default.jpg"
    );
});

// TEST 3:
test("renders first and last props in alt attribute", () => {
    const { container } = render(
        <ProfilePic firstName="dominika" last="tazikova" />
    );
    expect(container.querySelector("img").getAttribute("alt")).toBe(
        "dominika tazikova"
    );
});

// FirEvent to test the events
test("onClick prop gets called when img is clicked", () => {
    //Here i am creating and "onClick" mock because i want to test IF
    //onClick is invoked when the user clicks on the img.

    //This is what mock functions exist for! They exist to give us a way
    //to check if a function is being invoked when we expect it to!
    const onClick = jest.fn(); //storing mock in onClick event
    const { container } = render(<ProfilePic onClick={onClick} />);

    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));
    fireEvent.click(container.querySelector("img"));

    expect(onClick.mock.calls.length).toBe(3);
});
