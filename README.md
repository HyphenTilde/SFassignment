<h3> Assignment Phase 2 for 3813ICT <h3>

Angular Components:

Login:
Allows users to log in, or register if they do not have an existing account.

Account:
Deals with user's logged in. Displays their username, profile picture. Depending on their role, they have special permissions such as creating/removing group. It also shows the user what groups they are a part of.

Channels:
Displays the list of channels which exist in the group the user has clicked on. Channels are hyperlinks which will take you to the chat room of that specific channel.

Chat:
Where sockets functionality exists and users can chat in. There is chat history as well.

Register:
Where registration is handled. Users are required to put in unique usernames and e-mails. They start with the role 'user' by default and are added to group 1 by default.


--------------------------------

About MongoDB:

There are three collections: user, group and channelhistory.

User contains all the users. Their fields are id, username, email, pwd, role, groups and profilepic.

Group contains all the groups that exist. It contains id, groupname, groupcreator and channels.

Finally, there is channelhistory which saves the messages that get sent to a channel.

--------------------------------

Sockets are used to broadcast chat messages to users viewing a channel. They do indicate when a user joins or leaves a channel.

--------------------------------

There is no video chatting. There is image support since users can have profile pictures and that gets displayed.

--------------------------------

Tests have been done reguarly. All functions that exist function.

--------------------------------

Documentation - Data Structures:

Data is primarily maintained with MongoDB.

As mentioned before, there are three collections: channelhistory, group and user.

User contains id, username, email, pwd, role, groups and profilepic. Usernames and emails are unique, roles can be changed as superadmin promotes users which grants them special permissions such as creating, deleting, modifying groups and channels and adding and removing users from the groups they administer.

Group contains id, groupname, groupcreator, and channels. The reason why groupcreator exists is because group admins cannot modify/delete any group, but only the ones they administer. This rule is ignored if the user is a superadmin since they have special permissions.

Channelhistory simply contains channelhistory and messages. It is responsible for saving chat history within a channel and displaying the last 5 messages to users who enter later.

--------------------------------

REST API:

There are many routes that allow the frontend and backend to communicate. I will go down the list and explain each one.

api-changeprofilepic.js
Exists within the account component. Allows users to change their profile pictures and it displays that profile picture. Multer was used for handling and storing files. It checks for the user in the user database and changes their profilepic key. The value of the image is saved as encoded base-64 because it is easier to work with strings within the program rather than objects.

api-createchannel.js
Allows for channel creation for a specific group. Group admins can do this for groups they administer, super admins can do this for any group. The code checks for the group name and group creator or role of user. If valid, it proceeds to add the channel to the group. Otherwise, it will not allow for changes to happen.

api-creategroup.js
Allows for group creation. Group admins and super admins can do this. It does not allow you to create a group with no unique name.

api-deleteaccount.js
Allows user to delete their own account. Simply deletes them from the user collection database.

api-getchannels.js
Gathers channel data for the group a user clicked on and displays them so user can see them and access them. This is only done in the channels component due to complexity.

api-getprofilepic.js
Handles retrieving profile picture of user so it can be displayed on their account page and the chatroom they are chatting in. It finds the specific user and returns their profile picture.

api-login.js
Handles logging in. Takes in username and password, checks against user database, and if the user is valid, it will session storage their details and move onto the account page. Otherwise, nothing will happen. User can register instead.

api-messagedisplay.js
Displays channel history so users who enter a channel late can see the last five messages sent within the channel. Messages are pushed and sent back.

api-messagestore.js
Saves the messages sent to a channel and what channel they are sent in. Inserts into the channelhistory collection database and pushes messages into the messages array.

api-promote.js
Allows super admin to promote users to group admins and group admins to super admins. Will update the user collection database, specifically the user's role.

api-registeruser.js
Allows users to create a new account, but only if username and email are unique. Adds to the user collection database. User can then log in and proceed as normal.

api-removechannel.js
Allows super admin or group admin if it is for a group they administer to remove a channel. It will check for the group name and for group creator or super admin, then allow for changes to be implemented. It will update the channels array by pulling, removing the channel the admin wants to remove.

api-removechatuser.js
Allows super admin or group admin if it is for a group they administer to remove a chat user from a group. This will edit the targeted user's groups array, affecting which groups they have access to.

api-removegroup.js
Allows super admin or group admin if it is for a group they administer to delete a group. This affects the groups collection database and deletes the specified group if the name exists and the conditions are met (if user is a super admin and/or is the group creator).

--------------------------------

Documentation - Angular Architecture:

Angular deals with the frontend part of the project. It consists of the following components: account, channels, chat, login and register.

The login component takes user credentials, checks against MongoDB's user collection database, then takes user to account page if user is valid. The registration button is also there if user does not exist within the database so they can create an account.

The channels component prints the list of channels that exist within a group and allows you to visit its chat component and see chat history.

The chat component is where the socket functionality lies, where users can talk to each other and see previous messages.

The register component takes in user details and creates their account. It adds the user to the user collection database and allows user to login. It also gives group admins and super admins a new name to add to groups, etc.

The account component is where you go after logging in. It shows you your profile picture which you can change, and it's where special permissions are depending on the user's role. A regular user will not see what a super admin or group admin can see, because they do not have permission or access to those functions. This is also where you see what groups you are a part of, which are hyperlinks that take you to the channels component for that specific group you clicked on.

The service included is messages service and socket service. They both work together to allow users to join channels and send/receive messages live.

The models included are user, group, chat message and channel history. Those bring structure to the data that is handled within the application. User consists of id, username, email, pwd, role, groups and profilepic. Group consists of id, groupname, groupcreator and channels. Chat message consists of username and msg. Channel history consists of channelname and messages.