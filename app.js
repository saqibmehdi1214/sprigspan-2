const SUPABASE_URL = 'https://jmoqwhabpndmmabvgqmr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9jtkiG_iU-p9p78FqBLmCA_rAQcwz_N'; // Apni asli publishable key yahan dalein

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchJobs() {
    try {
        const { data, error } = await supabaseClient.from('Job').select('*');
        
        const jobsList = document.getElementById('jobsList');
        jobsList.innerHTML = '';
        
        if (error) {
            console.error('Error fetching jobs:', error);
            jobsList.innerHTML = '<tr><td colspan="5" class="empty-state">Database connection error.</td></tr>';
            return;
        }

        if (!data || data.length === 0) {
            jobsList.innerHTML = '<tr><td colspan="5" class="empty-state">Koi job maujood nahi hai. Supabase table mein data add karein.</td></tr>';
        } else {
            data.forEach(job => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${job.customer || ''}</strong></td>
                    <td>${job.address || ''}</td>
                    <td>${job.scheduledDate || ''}</td>
                    <td>${job.crew || ''}</td>
                    <td><span class="badge">${job.status || ''}</span></td>
                `;
                jobsList.appendChild(row);
            });
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

fetchJobs();
