// Commands:
//   hubot кто я?


module.exports = function(robot) {
    robot.respond(/кто я\??/i, function(msg) {
        var user = robot.brain.userForId(msg.message.user.id);

        msg.send(JSON.stringify(user));
    });
};
