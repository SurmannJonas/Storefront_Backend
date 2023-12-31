"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var _a = process.env, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, PEPPER = _a.PEPPER;
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, rows, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM users";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get users. ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result, user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *";
                        hash = bcrypt_1.default.hashSync(u.password + PEPPER, parseInt(SALT_ROUNDS, 10)
                        // parseInt(saltRounds)
                        );
                        return [4 /*yield*/, conn.query(sql, [u.username, hash])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not add new user (".concat(u.username, "): ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.read = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM users WHERE id=($1)";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ". ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.update = function (id, newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, sql, connection, rows, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstname = newUserData.firstname, lastname = newUserData.lastname;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        sql = "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [firstname, lastname, id])];
                    case 3:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error("Could not update user ".concat(firstname, " ").concat(lastname, ". ").concat(err_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM users WHERE id=($1)";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/, true];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ". ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT password_digest FROM users WHERE username=($1)";
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            user = result.rows[0];
                            console.log(user);
                            if (bcrypt_1.default.compareSync(password + PEPPER, user.password_digest)) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
