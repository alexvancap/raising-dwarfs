desc 'Updates the stats every hour'
task :update_stats => :environment do
    while true do
        date = DateTime.now
        if (date.min == 59)
            sleep 60
            
            User.all.each do |user|
                if (user)
                    user.characters.each do |character|
                        if (character.status != "dead")
                            user.money
                            user.update({money: user.money + character.earnings})
                            user.money
                        end
                    end
                end
            end
            if (Character.all)
                characters = Character.all
                characters.each do |character|
                    p character
                    if ((character.hungry == 0|| character.thirsty == 0|| character.sleepy == 0|| character.social == 0))
                           character.update({status: "dead"})
                    else
                        p 5
                       p  character.update({hungry: character.hungry - 5, thirsty: character.thirsty - 5, sleepy: character.sleepy - 5, social: character.social - 5})
                    end
                    if (character.sleepy <= 0)
                        character.status == "dead"
                    elsif(character.status == "asleep")
                            character.update({sleepy: character.sleepy + 5})
                            p 6
                    else
                        character.update({hungry: character.sleepy - 5})
                        p 7
                    end
                    p character
                end
               
            end
        end
        sleep 1
    end

end