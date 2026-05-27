/* ==========================================================================
   Azaadi Movement 2.0 - Core Frontend Script Engine
   ========================================================================== */

// 1. System Explorer Tab Data State Configuration
const tabData = {
    1: {
        old: "Absolute political control. Citizens only vote once in 5 years with no direct control over loopholed law creation.",
        new: "Direct citizen referencing. Laws are filtered by preinformative judicial scrutiny before implementation with unified Indian identity."
    },
    4: {
        old: "Netao ke jhoothe bhashan aur jhoothe vaade chalte rehte hain. Janta 5 saal tak bina kisi counter power ke majboor rehti hai.",
        new: "Annual Digital Vote based on verified promises tracker. If performance falls below configurations, the seat is reset instantly."
    },
    5: {
        old: "Judges appoint judges (Collegium System). Retirement ke baad political posts aur ministries reward ke roop mein milti hain.",
        new: "CJI election handled transparently via neutral consensus panel. Strict lifetime ban on joining any active political party or ministry."
    },
    6: {
        old: "Bureaucrats are bullied by ruling politicians. Frequent revenge transfers force compliance, keeping system records opaque.",
        new: "Administrative execution body is insulated from political transfers. Rigorous independent public audit on finance & interactions."
    }
};

// 2. Pillar Names Utility Mapping
const pillarNames = {
    1: "Preamble Sthiti & One Identity",
    2: "Restructuring of Absolute Laws",
    3: "Direct Citizen Referendums",
    4: "Subsidiary Active (Right to Recall)",
    5: "Accountable Judicial Scrutiny",
    6: "Protected Administration Audit"
};

/**
 * Handles tab switching in the System Comparison Section
 * @param {number} pillarNum - The ID of the selected pillar
 */
function switchTab(pillarNum) {
    // Active tabs button visual states reset
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-accent-green', 'text-black');
        btn.classList.add('text-zinc-400');
    });

    // Highlight current active tab selection
    const activeBtn = document.getElementById(`tab-btn-${pillarNum}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-accent-green', 'text-black');
    }
    
    // Inject relative system comparative content into DOM layout
    const contentArea = document.getElementById('tab-content-area');
    if (contentArea && tabData[pillarNum]) {
        contentArea.innerHTML = `
            <div class="p-6 border border-zinc-900 bg-black/40 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                <h4 class="text-xs font-bold tracking-widest uppercase accent-orange mb-3">Aaj Ka legacy System</h4>
                <p class="text-zinc-400 text-sm leading-relaxed">${tabData[pillarNum].old}</p>
            </div>
            <div class="p-6 border border-accent-green bg-zinc-950 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                <h4 class="text-xs font-bold tracking-widest uppercase accent-green mb-3">Azaadi 2.0 Framework</h4>
                <p class="text-white text-sm leading-relaxed font-semibold">${tabData[pillarNum].new}</p>
            </div>
        `;
    }
}

/**
 * Fetches real-time consensus dashboard metric states from Flask Backend server API
 */
async function loadDashboardMetrics() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        if (data.status === 'success') {
            // Update total master dashboard supporter statistics count
            const supporterDisplay = document.getElementById('total-supporters-count');
            if (supporterDisplay) {
                supporterDisplay.innerText = Number(data.total_supporters).toLocaleString('en-IN') + " Citizens";
            }
            
            // Loop compile dynamic interface tracking rows
            const container = document.getElementById('voting-pillars-container');
            if (container) {
                container.innerHTML = ''; // Clear layout frames
                
                for (let i = 1; i <= 6; i++) {
                    const stats = data.pillars[i] || { yes: 0, no: 0 };
                    const total = stats.yes + stats.no;
                    const yesPercentage = total > 0 ? Math.round((stats.yes / total) * 100) : 50; // default baseline state
                    
                    const blockHtml = `
                        <div class="border-b border-zinc-900/50 pb-6 last:border-none last:pb-0">
                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                                <h3 class="font-bold text-sm uppercase tracking-wider text-zinc-300">Pillar 0${i}: ${pillarNames[i]}</h3>
                                <div class="flex gap-2">
                                    <button onclick="castSystemVote(${i}, 'yes')" class="px-4 py-1.5 text-xs font-bold bg-zinc-900 border border-zinc-800 hover:border-accent-green hover:text-accent-green text-white transition-all duration-200">YES (${stats.yes})</button>
                                    <button onclick="castSystemVote(${i}, 'no')" class="px-4 py-1.5 text-xs font-bold bg-zinc-900 border border-zinc-800 hover:border-accent-orange hover:text-accent-orange text-white transition-all duration-200">NO (${stats.no})</button>
                                </div>
                            </div>
                            <div class="w-full bg-zinc-900 h-2 rounded-none overflow-hidden flex">
                                <div class="bg-accent-green h-full transition-all duration-500" style="width: ${yesPercentage}%"></div>
                                <div class="bg-accent-orange h-full transition-all duration-500" style="width: ${100 - yesPercentage}%"></div>
                            </div>
                            <div class="flex justify-between text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">
                                <span>Public Support: ${yesPercentage}%</span>
                                <span>Dissent: ${100 - yesPercentage}%</span>
                            </div>
                        </div>
                    `;
                    container.innerHTML += blockHtml;
                }
            }
        }
    } catch (error) {
        console.warn("Backend engine pipeline offline. Running standalone client sandbox visualization.");
        const supporterDisplay = document.getElementById('total-supporters-count');
        if (supporterDisplay) supporterDisplay.innerText = "10,000,000+ Citizens";
    }
}

/**
 * Submits user opinion selection record into Flask storage via API endpoint pipeline
 * @param {number} pillarId - target identity tracking parameter
 * @param {string} voteType - direction string configuration ('yes' or 'no')
 */
async function castSystemVote(pillarId, voteType) {
    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pillar_id: pillarId, vote_type: voteType })
        });
        const result = await response.json();
        if (result.status === 'success') {
            loadDashboardMetrics(); // Dynamic live interface validation refresh
        }
    } catch (error) {
        alert("Vote processing failed. local storage state locked. Launch your active Flask server app architecture to store entries.");
    }
}

// 3. System Startup Bootstrap Initialization Execution Routine
document.addEventListener('DOMContentLoaded', () => {
    switchTab(1);
    loadDashboardMetrics();
});
