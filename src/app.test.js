import React from "react";
import App from "./app";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

//automatic mock =  i am telling Jest to mock axios for me when Jest does this
// it will create a dumb copy of axios that includes all the methods of axios I need.

// the methods of axios I need are "get" and "post"
jest.mock("./axios");

test("App shows nothing at first", () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "dominika",
            last: "tazikova",
            url: "domi.jpg"
        }
    });

    const { container } = render(<App />);

    //this is how we can check if NOTHING has been rendered!
    expect(container.children.length).toBe(0);

    await waitForElement(() => container.querySelector('div'));

    expect(
        container.children.length
    ).toBe(1);
});
