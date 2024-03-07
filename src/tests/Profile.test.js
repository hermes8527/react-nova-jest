import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import ProfileComponent from "pages/profile/Profile";

describe("ProfileComponent", () => {
	const initialState = { output: 10 };
	const mockStore = configureStore();
	let store = mockStore(initialState);
	const theme = createMuiTheme();
	const history = createMemoryHistory();

	it("should render component without clashing", async () => {
		const { getByText } = render(
			<HelmetProvider context={{}}>
				<Router history={history}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<ProfileComponent />
						</Provider>
					</ThemeProvider>
				</Router>
			</HelmetProvider>
		);

		const title = getByText("Basic Information");

		expect(title).toBeTruthy();

		await waitFor(() => {
			expect(document.title).toEqual("Profile");
		});
	});
});
