"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_master_1 = require("./list-master/list-master");
var settings_1 = require("./settings/settings");
var tabs_1 = require("./tabs/tabs");
var tutorial_1 = require("./tutorial/tutorial");
var help_1 = require("./help/help");
// The page the user lands on after opening the app and without a session
exports.FirstRunPage = tutorial_1.TutorialPage;
// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
exports.MainPage = tabs_1.TabsPage;
// The initial root pages for our tabs (remove if not using tabs)
exports.Tab1Root = list_master_1.ListMasterPage;
exports.Tab2Root = help_1.HelpPage;
exports.Tab3Root = settings_1.SettingsPage;
//# sourceMappingURL=pages.js.map