const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://bwxxctyakpexqfbtoolg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHhjdHlha3BleHFmYnRvb2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMDY0OTYsImV4cCI6MjA5NDU4MjQ5Nn0.034YBMbkx3Eco-oBPfJDelLjnbOk9uHZJoOPxhogNM4'
);

async function checkPhotos() {
  const { data: females } = await supabase
    .from('profiles')
    .select('id, full_name, photo_url')
    .or('gender.eq.female,gender.eq.Female');

  console.log(`Total female profiles: ${females.length}`);
  
  const withPhotos = females.filter(p => p.photo_url);
  const withoutPhotos = females.filter(p => !p.photo_url);
  
  console.log(`WITH photos: ${withPhotos.length}`);
  console.log(`WITHOUT photos: ${withoutPhotos.length}`);

  console.log('\nFirst 5 profiles WITH photos:');
  withPhotos.slice(0, 5).forEach(p => {
    console.log(`  - ${p.full_name}: ${p.photo_url}`);
  });

  if (withoutPhotos.length > 0) {
    console.log('\nProfiles WITHOUT photos:');
    withoutPhotos.slice(0, 10).forEach(p => {
      console.log(`  - ${p.full_name} (ID: ${p.id})`);
    });
  }
}

checkPhotos();