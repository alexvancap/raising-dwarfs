desc 'runs all the timed tasks'
task :add_money => :environment do
    while true do
        p date = DateTime.now
        if (date.min == 8)
            sleep 60
            User.all.each do |user|
                if (user)
                    user.characters.each do |character|
                        p user.money
                        User.update({money: user.money + character.earnings})
                        p user.money
                    end
                end
            end
        end
        sleep 1
    end
end