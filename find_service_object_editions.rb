#!/usr/bin/env ruby

require 'net/http'
require 'uri'
require 'nokogiri'

def fetch_edition_content(edition_number)
  url = "https://newsletter.shortruby.com/p/edition-#{edition_number}"
  uri = URI(url)

  begin
    response = Net::HTTP.get_response(uri)
    if response.is_a?(Net::HTTPSuccess)
      response.body
    else
      nil
    end
  rescue => e
    puts "Error fetching edition #{edition_number}: #{e.message}"
    nil
  end
end

def contains_service_object?(content)
  content&.downcase&.include?("service object")
end

def find_editions_with_service_object(start_edition = 131, end_edition = 1)
  matching_editions = []

  (start_edition.downto(end_edition)).each do |edition|
    print "Checking edition #{edition}... "

    content = fetch_edition_content(edition)
    if content && contains_service_object?(content)
      matching_editions << edition
      puts "FOUND!"
    else
      puts "not found"
    end

    # Add a small delay to be nice to the server
    sleep(1)
  end

  matching_editions
end

# Main execution
puts "Searching for editions containing 'service object'..."
matching_editions = find_editions_with_service_object

puts "\nFound #{matching_editions.size} matching editions:"
matching_editions.each do |edition|
  puts "https://newsletter.shortruby.com/p/edition-#{edition}"
end
