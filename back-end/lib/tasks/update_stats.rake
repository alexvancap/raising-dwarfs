desc 'Updates the stats every hour'
task :update_stats => :environment do
    while true do
        date = DateTime.now
        if (date.min == 58)
            sleep 60
            if (user)
                user.characters.each do |character|
                    if (character.status != "dead")
                        User.update({money: user.money + character.earnings})
                    end
                end
            end
            if (Character.all)
                characters = Character.all
                characters.each do |character|
                    if ((character.hungry == 0|| character.thirsty == 0|| character.sleepy == 0|| character.social == 0))
                            character.status = "dead"
                    else
                        character.update({hungry: character.hungry - 5, thirsty: character.thirsty - 5, sleepy: character.sleepy - 5, social: character.social - 5})
                    end
                end
                if (character.sleepy <= 0)
                    character.status == "dead"
                elsif(character.status == "asleep")
                        character.update({sleepy: character.sleepy + 5})
                else
                    character.update({hungry: character.skeepy - 5})
                end
            end
        end
        sleep 1
    end

end