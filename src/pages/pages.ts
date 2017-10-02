import { ListMasterPage } from './list-master/list-master';
import { SettingsPage } from './settings/settings';
import { TabsPage } from './tabs/tabs';
import {HelpPage} from "./help/help";
import {WelcomePage} from "./welcome/welcome";

// The page the user lands on after opening the app and without a session
export const FirstRunPage = WelcomePage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = ListMasterPage;
export const Tab2Root = HelpPage;
export const Tab3Root = SettingsPage;
