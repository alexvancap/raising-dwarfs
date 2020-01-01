desc 'runs all the timed tasks'
task :run_tasks => :environment do
    Rake::Task["update_stats"].execute
    Rake::Task["add_money"].execute
end