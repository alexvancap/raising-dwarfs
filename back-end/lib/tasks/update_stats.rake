desc 'Updates the stats every hour'
task :update_stats => :environment do
    while true do
        if (Character.all)
            characters = Character.all
            characters.each do |character|
                if ((character.hungry == 0|| character.thirsty == 0|| character.sleepy == 0|| character.social == 0))
                        character.status = "dead"
                end
                stats = character.update({hungry: character.hungry - 1, thirsty: character.thirsty - 5, sleepy: character.sleepy - 1, social: character.social - 2})
                p stats
            end
            sleep 3600
        end
    end

end