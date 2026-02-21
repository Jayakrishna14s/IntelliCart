INSERT INTO user_ (
    id,
    email,
    firstname,
    lastname,
    password,
    mobile,
    gender,
    dob,
    profile_image,
    role,
    is_active
) VALUES (
    1,
    'email@gmail.com',
    'Krishna',
    'User',
    '$2a$10$LaRGb7kXgYVyyGLqbXnMbuZKDyG0DZFUh8TkqbCtGTs01/obc4Oqu',
    '9999999999',
    'MALE',
    '2005-01-01',
    'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg',
    'ROLE_USER',
    true
);

INSERT INTO user_ (
    id,
    email,
    firstname,
    lastname,
    password,
    mobile,
    gender,
    dob,
    profile_image,
    role,
    is_active
) VALUES (
    2,
    'krishna9502202491@gmail.com',
    'Jayakrishna',
    'Paripelli',
    '$2a$10$LaRGb7kXgYVyyGLqbXnMbuZKDyG0DZFUh8TkqbCtGTs01/obc4Oqu',
    '9390107253',
    'MALE',
    '2005-05-29',
    'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg',
    'ROLE_USER',
    true
);


truncate user_;

select * from user_;