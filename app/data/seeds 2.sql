use KennelLog;
-- select * from People;
select * from PeoplePermissions;
-- select * from animals;
-- drop table AnimalPermissions;
-- drop table AnimalRestrictions;

drop table PeoplePermissions;
create table PeoplePermissions
(   -- This table represents the group and color of animals that one individual is allowed to interact
    -- with.  It is a one-to-many relationship.  One person can be authorized to interact with more
    -- than one of the animal groups if they have completed the required orientation classes.
    --
    -- Note that it is the combination of group and color these permissions represent.  An individual
    -- may be permitted to walk green, orange, blue and purple dogs but only green and orange cats.
    --
    -- More specific combinations override less specific combinations.  for instance:
    --  George, null, dogs, blue, true              would authorize George to walk blue dogs
    --  George, Geronimo, dogs, blue, false         would override George's permission for this one dog
    --                                              named Geronimo, and does not affect permission to walk
    --                                              other blue dogs.

    id              int(10)
                    not null
                    auto_increment,

    person          int(10)                     -- the primary key of the record in People representing
                    not null,                   -- this individual

    animal          int(10)                     -- the primary key of the record in Animals representing
                    default null,               -- this animal

    animal_group    char(10)
                    not null,

    color_code      char(10)
                    not null,

    permitted       tinyint(1)                  -- is this a permission or a restriction?
                    not null
                    default 0,

    auth_by         int(10)                     -- the primary key of the record representing the person
                    not null,                   -- who authorized this level

    auth_date       date                        -- the date this individual was authorized
                    not null,

    foreign key (person) references People (id),
    primary key (id)
)
engine="InnoDB";

insert into PeoplePermissions (person, animal, animal_group, color_code, permitted, auth_by, auth_date)
values (1, null, "cats", "green", true, 0, now()),
       (1, null, "cats", "orange", true, 0, now()),
       (1, null, "cats", "blue", true, 0, now()),
       (1, null, "dogs", "green", true, 0, now()),
       (1, null, "dogs", "orange", true, 0, now()),
       (1, null, "dogs", "blue", true, 0, now()),
       (1, null, "dogs", "purple", true, 0, now()),
       (1, null, "dogs", "black", true, 0, now()),
       (1, 5, "dogs", "purple", false, 0, now()),
       (1, 4, "dogs", "purple", false, 0, now()),
       (1, 7, "dogs", "red", true, 0, now()),
       (2, null, "dogs", "green", true, 0, now()),
       (2, null, "dogs", "orange", true, 0, now()),
       (3, null, "cats", "green", true, 0, now()),
       (3, null, "cats", "orange", true, 0, now()),
       (3, null, "cats", "blue", true, 0, now()),
       (3, null, "cats", "purple", true, 0, now()),
       (4, null, "dogs", "green", true, 0, now()),
       (4, null, "dogs", "orange", true, 0, now()),
       (4, 7, "dogs", "red", true, 0, now()),
       (4, 5, "dogs", "purple", false, 0, now());
