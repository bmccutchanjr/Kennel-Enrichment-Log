use kennellog;

insert into People (active, surname, given, auth_level, enter_date, mod_date, mod_by)
values (true, "McCutchan", "Bill", "volunteer", "2018-11-06", "2018-11-06", 0),
       (true, "Stone", "Sharon", "volunteer", "2018-11-06", "2018-11-06", 0),
       (true, "Aniston", "Jennifer", "volunteer", "2018-11-06", "2018-11-06", 0),
       (true, "Lopez", "Jennifer", "volunteer", "2018-11-06", "2018-11-06", 0),
       (true, "Garner", "Jennifer", "volunteer", "2018-11-06", "2018-11-06", 0),
       (true, "Brannigan", "Amy", "staff", "2018-11-06", "2018-11-06", 0);

select * from People;
