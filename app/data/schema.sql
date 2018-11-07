drop database if exists KennelLog;
create database if not exists KennelLog;
use KennelLog;

--
-- First create the tables required for the Foreign Key constraints
--
--
-- Groups, Colors and Notes are required by multiple other tables
--

create table AnimalColors
(   -- Master table of allowable color codes...used for validation

    color_level     tinyint(1)              -- level of restrictions, 0 is the most permissive
                    not null,

    color_code      char(6)
                    not null
                    unique,

    primary key (color_code)
)
engine="InnoDB";

insert into AnimalColors (color_level, color_code)
values (0, "green"),
       (1, "orange"),
       (2, "blue"),
       (3, "purple"),
       (4, "red"),
       (5, "black");

create table AnimalGroups
(   -- Master table of functional groups that are used in the applications
    --
    -- Rules for dogs are different than rules for cats and rules for small critters (mice, rats,
    -- gerbils, etc)

    animal_group    char(10)
                    not null
                    unique,

    primary key (animal_group)
)
engine="InnoDB";

insert into AnimalGroups (animal_group)
values ("cats"),
       ("critters"),
       ("dogs"),
       ("other");

create table Notes
(   -- Notes are notes are notes
    --
    -- All notes associated with any of the tables go here...

    id              int(10)
                    auto_increment
                    not null,

    notes           blob
                    not null,

    primary key (id)    
)
engine="InnoDB";

--
-- AuthorityLevels is required by People
--

create table AuthorityLevels
(   -- Master table of authority levels (admin, staff or volunteer)

    auth_level      char(10)
                    not null
                    unique,

    auth_desc       varchar(100)
                    default null,

    primary key (auth_level)
)
engine="InnoDB";

insert into AuthorityLevels (auth_level, auth_desc)
values ("admin", "Granted access to administrative functions of this application"),
       ("staff", null),
       ("volunteer", null);

create table People
(   -- Master table of people

    id              int(10)
                    not null
                    auto_increment
                    unique,

    active          boolean
                    default false,

    name            varchar(20)                 -- name of this person
                    not null,

    volgistics      smallint(6)                 -- this persons volgistics id
                    default null,

    auth_level            char(10),

    notes           int(10)
                    default null,

    enter_date      date                        -- date the record was created
                    not null,

    mod_date        date                        -- date this record was last modified
                    not null,

    mod_by          int(10)                     -- the primary key of the last person to modify
                    not null,                   -- this record

    foreign key (auth_level) references AuthorityLevels (auth_level),
    foreign key (notes) references Notes (id),
    primary key (id)
)
engine="InnoDB";

create table Animals
(   -- Master table of animals in the shelter

    id              int(10)
                    auto_increment
                    unique,

    name            varchar(20)                 -- the name of the animal
                    not null,

    active          boolean                     -- is the animal in the shelter?
                    default true,

    animal_group    char(10)                    -- functional grouping for animals
                    default null,

    species         enum("cat",                 -- the species of the animal
                         "dog",
                         "guinea pig",
                         "hamster",
                         "mouse",
                         "rabbit",
                         "rat",
                         "other"),

    color_code      char(6)                     -- animal color code
                    default "red",

    cage            smallint(4)                 -- the cage number assigned to this animal
                    default 0,

    notes           int(10)
                    default null,

    enter_date      date,                       -- date this record was created

    mod_date        date,                       -- date this record was last modified

    mod_by          int(10)                     -- id of the user to last modify this record
                    default null,

    foreign key (animal_group) references AnimalGroups (animal_group),
    foreign key (color_code) references AnimalColors (color_code),
    foreign key (notes) references Notes (id),
    foreign key (mod_by) references People (id),
    primary key (id)
)
engine="InnoDB";

--
-- Permissions and Restrictions
--

create table AnimalPermissions
(   -- This table represents the group and color of animals that one individual is allowed to interact
    -- with.  It is a one-to-many relationship.  One person can be authorized to interact with more
    -- than one of the animal groups if they have completed the required orientation classes.
    --
    -- Note that it is the combination of group and color these permissions represent.  An individual
    -- may be permitted to walk green, orange, blue and purple dogs but only green and orange cats.

    id              int(10)
                    not null
                    auto_increment
                    unique,

    name            varchar(20)                 -- name of this person
                    not null,

    animal_group    char(10)
                    not null,

    color_code      char(10)
                    not null,

    auth_by         int(10)                     -- the primary key of the record representing the person
                    not null,                   -- who authorized this level

    auth_date       date                        -- the date this individual was authorized
                    not null,

    foreign key (color_code) references AnimalColors (color_code),
    foreign key (animal_group) references AnimalGroups (animal_group),
    primary key (id)
)
engine="InnoDB";

create table AnimalRestrictions
(   -- This table represents restrictions placed on an individual.  For instance thay may be allowed
    -- to walk purple dogs, but not this one dog

    person          int(10)                     -- the primary key of the person this record represents
                    not null,

    animal          int(10)                     -- the primary key of the animal this record represents
                    not null,

    notes           int(10)
                    default null,

    restrict_by     int(10)                     -- the primary key of the record representing the person
                    not null,                   -- who created or modified this restriction

    restrict_date   date                        -- the date this individual was restricted
                    not null,

    foreign key (person) references People (id),
    foreign key (restrict_by) references People (id),
    foreign key (animal) references Animals (id),
    foreign key (notes) references Notes (id),
    primary key (person, animal)
)
engine="InnoDB";
