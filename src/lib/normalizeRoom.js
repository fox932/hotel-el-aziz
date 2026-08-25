/**
 * Le backend renvoie capacity_text / bed_text ; les composants existants
 * attendent capacity / bed (même forme que l'ancien src/data/rooms.js).
 * Cette fonction fait le pont entre les deux sans toucher aux composants.
 */
export function normalizeRoom(r) {
  return {
    slug: r.slug,
    name: r.name,
    capacity: r.capacity_text,
    bed: r.bed_text,
    price: r.price,
    guests: r.guests,
    totalUnits: r.total_units,
    amenities: r.amenities || [],
    description: r.description,
  }
}
