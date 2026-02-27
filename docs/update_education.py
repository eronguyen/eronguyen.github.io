import re

with open('education.html', 'r') as f:
    content = f.read()

# Replace <main>...</main>
new_main = """    <main>
        <div class="research-header" style="margin-top: 2rem;">
            <h1 class="text-gradient">Education</h1>
            <p style="color: var(--text-muted); max-width: 600px; margin: 1rem auto 0;">
                My academic journey in Computer Science and Engineering.
            </p>
        </div>

        <section class="section reveal active" id="education" style="padding-top: 0;">
            <div class="education-timeline">

                <!-- Northeastern -->
                <div class="timeline-item">
                    <div class="timeline-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Northeastern_University_seal.svg"
                            alt="Northeastern Logo">
                    </div>
                    <div class="education-card">
                        <div class="education-card-header">
                            <div>
                                <h3 class="school-name">Northeastern University</h3>
                                <p class="degree-name">Ph.D. in Computer Science</p>
                            </div>
                            <div class="date-badge">Fall 2025 - Present</div>
                        </div>
                        <div class="education-card-body">
                            <ul>
                                <li><i class="fas fa-bolt text-teal"></i> Incoming PhD Student</li>
                            </ul>
                            <a href="https://www.northeastern.edu/" target="_blank" class="visit-btn">Visit Website</a>
                        </div>
                    </div>
                </div>

                <!-- HKUST -->
                <div class="timeline-item">
                    <div class="timeline-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/HKUST_logo.svg/1200px-HKUST_logo.svg.png"
                            alt="HKUST Logo">
                    </div>
                    <div class="education-card">
                        <div class="education-card-header">
                            <div>
                                <h3 class="school-name">Hong Kong University of Science and Technology</h3>
                                <p class="degree-name">M.Phil in Computer Science and Engineering</p>
                            </div>
                            <div class="date-badge">2022 - 2024</div>
                        </div>
                        <div class="education-card-body">
                            <ul>
                                <li><i class="fas fa-bolt text-teal"></i> Advised by Prof. Sai-Kit Yeung</li>
                            </ul>
                            <a href="https://hkust.edu.hk/" target="_blank" class="visit-btn">Visit Website</a>
                        </div>
                    </div>
                </div>

                <!-- HCMUS -->
                <div class="timeline-item">
                    <div class="timeline-logo">
                        <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/e/e5/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_T%E1%BB%B1_nhi%C3%AAn%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Qu%E1%BB%91c_gia_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.svg/1053px-Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_T%E1%BB%B1_nhi%C3%AAn%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Qu%E1%BB%91c_gia_Th%C3%A0nh_ph%E1%BB%91_H%E1%BB%93_Ch%C3%AD_Minh.svg.png"
                            alt="HCMUS Logo" style="max-height: 85%; max-width: 85%;">
                    </div>
                    <div class="education-card">
                        <div class="education-card-header">
                            <div>
                                <h3 class="school-name">University of Science, VNU-HCM</h3>
                                <p class="degree-name">B.Sc. in Computer Science | Advanced Program in Computer Science
                                </p>
                            </div>
                            <div class="date-badge">2018 - 2022</div>
                        </div>
                        <div class="education-card-body">
                            <ul>
                                <li><i class="fas fa-bolt text-teal"></i> Advised by Prof. Minh-Triet Tran</li>
                                <li><i class="fas fa-bolt text-teal"></i> Thesis title: Smart Interactive Retrieval of
                                    Visual Data via Semantic Understanding</li>
                                <li><i class="fas fa-bolt text-teal"></i> GPA: 3.94/4.0</li>
                            </ul>
                            <a href="https://hcmus.edu.vn/" target="_blank" class="visit-btn">Visit Website</a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </main>"""

content = re.sub(r'    <main>.*?</main>', new_main, content, flags=re.DOTALL)

# Delete the research filtering script at the bottom
content = re.sub(r'    <script>\n        // Research Page Specific Filtering.*?</script>', '', content, flags=re.DOTALL)

# Update page title
content = content.replace('<title>Hai Nguyen-Truong | Portfolio</title>', '<title>Hai Nguyen-Truong | Education</title>')

with open('education.html', 'w') as f:
    f.write(content)

with open('index.html', 'r') as f:
    index_content = f.read()

# Delete the exact education section from index.html
# It starts at <!-- Education Section --> and ends at </section> before <!-- Experience Section -->
index_content = re.sub(r'        <!-- Education Section -->\n        <section class="section reveal" id="education">.*?</section>\n\n', '', index_content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(index_content)
