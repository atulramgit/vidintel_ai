from youtube_transcript_api import YouTubeTranscriptApi

try:
    # "jNQXAC9IVRw" is 'Me at the zoo', very short.
    transcript_data = YouTubeTranscriptApi.fetch("jNQXAC9IVRw", languages=['en'])
    print(f"Type of transcript_data: {type(transcript_data)}")
    
    if len(transcript_data) > 0:
        first_item = transcript_data[0]
        print(f"Type of first item: {type(first_item)}")
        print(f"Attributes of first item: {dir(first_item)}")
        
        # Check for text attribute
        if hasattr(first_item, 'text'):
            print(f"Item has 'text' attribute: {first_item.text}")
        else:
            print("Item does NOT have 'text' attribute.")

except Exception as e:
    print(f"Error: {e}")
