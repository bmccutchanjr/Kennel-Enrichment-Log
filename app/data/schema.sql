drop database if exists KennelLog;
create database if not exists KennelLog;
use KennelLog;

--
-- Master table of animals and the associated tables that go with it
--

create table Animals
(   -- Master table of animals in the shelter

    id              int(10)
                    auto_increment,

    animal          varchar(20)                 -- the name of the animal
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

    primary key (id)
)
engine="InnoDB";

create table AnimalColors
(   -- Master table of allowable color codes...used for validation
    --
    -- I had originally made this table a FOREIGN KEY constraint in Animals.  But that's not
    -- really the purpose of this data.  It is used for validation purposes at the time of data
    -- entry and does not represent a relationship between these tables.

    color_order     tinyint(1)              -- level of restrictions, 0 is the most permissive
                    not null,

    color_code      char(6)
                    not null,

    primary key (color_order)
)
engine="InnoDB";

insert into AnimalColors (color_order, color_code)
values (0, "green"),
       (1, "orange"),
       (2, "blue"),
       (3, "purple"),
       (4, "red"),
       (5, "black");

create table ColorReasons
(   -- The reaons that a color has been assigned to a particular animal.
    --
    -- This table is not is use at this time.  When it is, I may want a master table with the possible
    -- entries because they're pretty consistant and don't change much from animal to animal.  There are
    -- some reasons that are unique to particular animals, however. 

    id              int(10)
                    auto_increment
                    not null,

    reason          varchar(100)
                    not null,

    primary key (id)
)
engine="InnoDB";

create table AnimalGroups
(   -- Master table of functional groups that are used in the applications
    --
    -- I had originally made this table a FOREIGN KEY constraint in Animals.  But that's not
    -- really the purpose of this data.  It is used for validation purposes at the time of data
    -- entry and does not represent a relationship between these tables.
    --
    -- Rules for dogs are different than rules for cats and rules for small critters (mice, rats,
    -- gerbils, etc)

    animal_group    char(10)
                    not null,

    primary key (animal_group)
)
engine="InnoDB";

insert into AnimalGroups (animal_group)
values ("cats"),
       ("critters"),
       ("dogs"),
       ("other");

--
-- Master table of People and the associated tables
--

create table People
(   -- Master table of people

    id              int(10)
                    not null
                    auto_increment,

    active          boolean
                    default false,

    surname         varchar(20)                 -- surname of this individual
                    not null,

    given           varchar(10)                 -- given name of this person
                    not null,

    volgistics      smallint(6)                 -- volgistics id of this individual
                    default null,

    auth_type      char(10)
                    default "volunteer",

    notes           int(10)
                    default null,

    enter_date      date                        -- date the record was created
                    not null,

    mod_date        date                        -- date this record was last modified
                    not null,

    mod_by          int(10)                     -- the primary key of the last person to modify
                    not null,                   -- this record

    primary key (id)
)
engine="InnoDB";

create table AuthorityLevels
(   -- Master table of authority levels (admin, staff or volunteer)
    --
    -- I had originally made this table a FOREIGN KEY constraint in People.  But that's not really 
    -- the purpose of this table.    It is used for validation purposes at the time of data
    -- entry and does not represent a relationship between these tables.

    auth_type      char(10)
                    not null,

    auth_desc       varchar(100)
                    default null,

    primary key (auth_type)
)
engine="InnoDB";

insert into AuthorityLevels (auth_level, auth_desc)
values ("admin", "Granted access to administrative functions of this application"),
       ("staff", null),
       ("volunteer", null);

create table AnimalPermissions
(   -- This table represents the group and color of animals that one individual is allowed to interact
    -- with.  It is a one-to-many relationship.  One person can be authorized to interact with more
    -- than one of the animal groups if they have completed the required orientation classes.
    --
    -- Note that it is the combination of group and color these permissions represent.  An individual
    -- may be permitted to walk green, orange, blue and purple dogs but only green and orange cats.

    id              int(10)
                    not null
                    auto_increment,

    person          int(10)                     -- the primary key of the record in People representing
                    not null,                   -- this individual

    animal_group    char(10)
                    not null,

    color_code      char(10)
                    not null,

    auth_by         int(10)                     -- the primary key of the record representing the person
                    not null,                   -- who authorized this level

    auth_date       date                        -- the date this individual was authorized
                    not null,

    foreign key (person) references People (id),
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
    primary key (person, animal)
)
engine="InnoDB";

--
--
--

create table InteractionLog
(   -- This is the equivalent of the sign-out sheet...who has signed an animal out of its cage and
    -- when.  It could be used in real time for kennel staff to know who has an animal in the event they
    -- need to find it.
    --
    -- Although this is a simple table, it is the meat and potatoes of the application.

    id          int(10)
                auto_increment
                not null,

    person      int(10)
                not null,

    animal      int(10)
                not null,

    sign_out    datetime
                not null
                default CURRENT_TIMESTAMP,

    sign_in     datetime
                default null,

    notes       int(10)
                default null,

    foreign key (person) references People (id),
    foreign key (animal) references Animals (id),
    primary key (id)
)
engine="InnoDB";

--
-- Miscellaneous tables.  These table don't belong to a particular functionality (like Animals,
-- AnimalColors, etc) and may be referenced by many tables.
--

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
