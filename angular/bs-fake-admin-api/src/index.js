"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var e = (0, express_1.default)();
e.use((0, cors_1.default)());
e.get('Auth/Login', function (req, res) {
    res.redirect('http://localhost:4200?accessToken=test');
});
e.get('DashboardMetrics', function (req, res) {
    res.json({
        UsersConnected: 31,
        BattleHappening: 5,
        MemoryUsage: 0.5,
        ErrorsUnhandled: 6
    });
});
e.listen(3000, function () {
    console.log('server running in localhost:3000');
});
