use kennellog;
-- select p.surname, p.given, a.animal, pp.color_code, pp.permitted from peoplepermissions pp
-- left join people p on pp.person=p.id
-- left join animals a on pp.animal=a.id
-- where pp.animal_group="dogs"
-- order by p.surname, p.given, a.animal desc;

select pp.person, pp.animal_group, p.surname, p.given, p.volgistics
from peoplepermissions pp
left join people p
    on pp.person=p.id
where pp.animal_group="dogs" and p.active=true
group by p.surname, p.given
order by p.surname, p.given;
