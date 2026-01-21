import { Song } from "../store/songStore";

export function getPrimaryArtists(song: Song): string {
  if (song.artists?.primary) {
    return song.artists.primary.map((a) => a.name).join(", ");
  }

  return song.primaryArtists || "Unknown Artist";
}

export function getArtistIds(song: Song): string[] {
  if (song.artists?.primary) {
    return song.artists.primary.map((a) => a.id);
  }
  return [];
}

export function getAlbumName(song: Song): string {
  return song.album?.name || "Unknown Album";
}
