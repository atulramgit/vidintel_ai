from youtube_transcript_api import YouTubeTranscriptApi

try:
    print("Attempting instantiation...")
    api = YouTubeTranscriptApi()
    print("Instantiation successful.")
    
    print("Attempting api.fetch('jNQXAC9IVRw')...")
    transcript_data = api.fetch("jNQXAC9IVRw", languages=['en'])
    print(f"Fetch successful. Type: {type(transcript_data)}")
    
    if len(transcript_data) > 0:
        first_item = transcript_data[0]
        print(f"First item type: {type(first_item)}")
        print(f"First item attributes: {dir(first_item)}")
        if hasattr(first_item, 'text'):
            print(f"Item.text: {first_item.text}")

except Exception as e:
    print(f"Error: {e}")
