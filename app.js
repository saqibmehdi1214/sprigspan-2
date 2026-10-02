// Apni Supabase details yahan dalein (Apne Supabase project settings se dekh kar)
const SUPABASE_URL = 'https://jmoqwhabpndmmabvgqmr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9jtkiG_iU-p9p78FqBLmCA_rAQcwz_N';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchJobs() {
    try {
        const { data, error } = await supabase.from('Job').select('*');
        
        document.getElementById('loading').style.display = 'none';
        
        if (error) {
            console.error('Error fetching jobs:', error);
            alert('Database se data load karne mein masla aa raha hai.');
            return;
        }

        const jobsList = document.getElementById('jobsList');
        jobsList.innerHTML = '';

        if (data.length === 0) {
            jobsList.innerHTML = '<tr><td colspan="5" style="text-align: center;">Koi job maujood nahi hai.</td></tr>';
        } else {
            data.forEach(job => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${job.customer || ''}</td>
                    <td>${job.address || ''}</td>
                    <td>${job.scheduledDate || ''}</td>
                    <td>${job.crew || ''}</td>
                    <td><strong>${job.status || ''}</strong></td>
                `;
                jobsList.appendChild(row);
            });
        }

        document.getElementById('jobsTable').style.display = 'table';
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

fetchJobs();
