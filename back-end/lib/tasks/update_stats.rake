desc 'Updates the stats every hour'
task :update_stats => :environment do
    while true do
        date = DateTime.now
        if (date.min == 58)
            sleep 60
            if (Character.all)
                characters = Character.all
                characters.each do |character|
                    if ((character.hungry == 0|| character.thirsty == 0|| character.sleepy == 0|| character.social == 0))
                            character.status = "dead"
                    else
                        character.update({hungry: character.hungry - 5, thirsty: character.thirsty - 5, sleepy: character.sleepy - 5, social: character.social - 5})
                    end
                end
            end
        end
        sleep 1
    end

end