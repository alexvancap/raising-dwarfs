desc 'runs all the timed tasks'
task :add_money => :environment do
    while true do
        User.all.each do |user|
            if (user)
                user.characters.each do |character|
                    User.update({money: user.money + character.earnings})
                    p user.money
                end
            end
        end
        sleep 2
    end
end