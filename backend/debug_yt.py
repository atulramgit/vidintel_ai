from youtube_transcript_api import YouTubeTranscriptApi

print("Attributes of YouTubeTranscriptApi:")
print(dir(YouTubeTranscriptApi))

try:
    print("\nAttempting to call YouTubeTranscriptApi.fetch:")
    # Trying to replicate the call to see the exact error or behavior
    # We'll pass a dummy video_id just to check the signature/existence
    YouTubeTranscriptApi.fetch("123", languages=['en'])
except Exception as e:
    print(f"\nError calling fetch: {e}")

try:
    print("\nAttempting to call YouTubeTranscriptApi.get_transcript:")
    # get_transcript usually works
    # We won't actually fetch a real video to avoid network ops unless necessary, 
    # but we can check if the method exists.
    print(YouTubeTranscriptApi.get_transcript)
except Exception as e:
    print(f"\nError accessing get_transcript: {e}")
